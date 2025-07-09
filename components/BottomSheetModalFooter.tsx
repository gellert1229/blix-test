import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type BottomSheetModalFooterProps = BottomSheetFooterProps & {
  onSend: (message: string) => void;
  isLoading?: boolean;
};

export const BottomSheetModalFooter = ({
  onSend,
  isLoading = false,
  ...footerProps
}: BottomSheetModalFooterProps) => {
  const colorScheme = useColorScheme();
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      onSend(inputMessage.trim());
      setInputMessage("");
    }
  };

  return (
    <BottomSheetFooter {...footerProps}>
      <ThemedView
        style={[
          styles.inputWrapper,
          {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderTopColor: colorScheme === "dark" ? "#404040" : "#E5E7EB",
          },
        ]}
      >
        <ThemedView style={styles.inputContainer}>
          <BottomSheetTextInput
            style={[
              styles.input,
              {
                backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "#F0F0F0",
                color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
              },
            ]}
            placeholder="Type your message..."
            placeholderTextColor={
              colorScheme === "dark" ? "#888888" : "#666666"
            }
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
            autoCapitalize="none"
            autoCorrect
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                opacity: inputMessage.trim() && !isLoading ? 1 : 0.5,
                backgroundColor: isLoading ? "#999" : "#2563EB",
              },
            ]}
            onPress={handleSend}
            disabled={!inputMessage.trim() || isLoading}
          >
            <ThemedText style={styles.sendButtonText}>Send</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </BottomSheetFooter>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingBottom: Platform.OS === "ios" ? 32 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 12,
    paddingRight: 48,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingHorizontal: 24,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
