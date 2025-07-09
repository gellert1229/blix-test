import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  BackHandler,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { AIMessage, Message } from "@/types/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalFooter } from "@/components/BottomSheetModalFooter";
import { MessageBubble } from "@/components/MessageBubble";
import { getResponse, getFollowUpQuestions } from "@/api/fakeResponses";

type BottomSheetModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
};

export const BottomSheetModal = ({
  isVisible,
  onClose,
  title,
  children,
}: BottomSheetModalProps) => {
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSnapHeight, setCurrentSnapHeight] = useState(0);

  const footerHeight = Platform.OS === "ios" ? 100 : 88;
  const availableHeight = currentSnapHeight
    ? currentSnapHeight - headerHeight - footerHeight
    : containerHeight - headerHeight - footerHeight;

  const handleSend = async (message: string) => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getResponse();
      const aiMessageId = (Date.now() + 1).toString();
      const followUpQuestions = getFollowUpQuestions();
      const aiMessage: AIMessage = {
        id: aiMessageId,
        text: response,
        isUser: false,
        timestamp: Date.now(),
        followUpQuestions: followUpQuestions,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleFollowUpPress = (question: string) => {
    handleSend(question);
  };

  const snapPoints = useMemo(() => ["50%", height - 50], [height]);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      } else {
        // Update current snap point height
        const snapPoint = snapPoints[index];
        const snapHeight =
          typeof snapPoint === "string"
            ? (parseFloat(snapPoint) / 100) * height
            : snapPoint;
        setCurrentSnapHeight(snapHeight);
      }
    },
    [onClose, snapPoints, height]
  );

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetModalFooter
        {...props}
        onSend={handleSend}
        isLoading={isLoading}
      />
    ),
    [isLoading]
  );

  if (!isVisible) return null;

  console.log(snapPoints);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      keyboardBehavior={Platform.OS === "ios" ? "interactive" : "extend"}
      android_keyboardInputMode="adjustResize"
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      footerComponent={renderFooter}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={[
        styles.bottomSheetBackground,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <ThemedView
        style={styles.container}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setContainerHeight(height);
        }}
      >
        <ThemedView
          style={styles.header}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeaderHeight(height);
          }}
        >
          <ThemedText style={styles.headerTitle}>{title}</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {availableHeight > 0 && (
          <ScrollView
            ref={scrollViewRef}
            style={[
              styles.scrollView,
              {
                height: availableHeight,
                marginBottom: currentSnapHeight < 500 ? 370 : 0,
              },
            ]}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            bounces={false}
          >
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onFollowUpPress={
                  !message.isUser ? handleFollowUpPress : undefined
                }
              />
            ))}
            {isLoading && (
              <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator
                  color={Colors[colorScheme ?? "light"].text}
                />
              </ThemedView>
            )}
          </ScrollView>
        )}
      </ThemedView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDDDDD",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "400",
  },
  scrollView: {
    backgroundColor: "transparent",
  },
  scrollViewContent: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 120,
  },
  modalTitle: {
    marginBottom: 16,
  },
  handleIndicator: {
    backgroundColor: "#DDDDDD",
    width: 40,
    height: 4,
  },
  bottomSheetBackground: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
});
