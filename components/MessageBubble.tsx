import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AIMessage, Message } from "@/types/types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type MessageBubbleProps = {
  message: Message | AIMessage;
  onFollowUpPress?: (question: string) => void;
};

export const MessageBubble = ({
  message,
  onFollowUpPress,
}: MessageBubbleProps) => {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  if (message.isUser) {
    // User message in bubble format
    return (
      <ThemedView style={styles.userMessageContainer}>
        <ThemedView
          style={[
            styles.userBubble,
            {
              backgroundColor: "#2563EB",
            },
          ]}
        >
          <ThemedText style={styles.userMessageText}>{message.text}</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  } else {
    // AI message in clean separated format
    const followUpQuestions = (message as AIMessage).followUpQuestions;

    return (
      <ThemedView style={styles.aiMessageContainer}>
        <ThemedView style={styles.aiHeader}>
          <ThemedView style={styles.aiAvatar}>
            <ThemedText style={styles.aiAvatarText}>AI</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.aiContent}>
          <ThemedText
            style={[
              styles.aiMessageText,
              {
                color: Colors[colorScheme ?? "light"].text,
              },
            ]}
          >
            {message.text}
          </ThemedText>

          {onFollowUpPress && (
            <ThemedView style={styles.followUpSection}>
              <ThemedText
                style={[
                  styles.followUpTitle,
                  {
                    color: Colors[colorScheme ?? "light"].text,
                    opacity: 0.7,
                  },
                ]}
              >
                Ask a follow up question
              </ThemedText>

              <ThemedView style={styles.followUpButtons}>
                {followUpQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.followUpButton,
                      {
                        backgroundColor: isLight ? "#F3F4F6" : "#374151",
                        borderColor: isLight ? "#E5E7EB" : "#4B5563",
                      },
                    ]}
                    onPress={() => onFollowUpPress(question)}
                  >
                    <ThemedText
                      style={[
                        styles.followUpButtonText,
                        {
                          color: Colors[colorScheme ?? "light"].text,
                        },
                      ]}
                    >
                      {question}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    );
  }
};

const styles = StyleSheet.create({
  // User message styles (bubble format)
  userMessageContainer: {
    alignItems: "flex-end",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  userBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessageText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    fontWeight: "400",
  },

  // AI message styles (clean separated format)
  aiMessageContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  aiAvatarText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  aiContent: {
    paddingLeft: 0,
  },
  aiMessageText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    marginBottom: 16,
  },

  // Follow-up section styles
  followUpSection: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  followUpTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  followUpButtons: {
    gap: 8,
  },
  followUpButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 2,
  },
  followUpButtonText: {
    fontSize: 14,
    fontWeight: "400",
  },
});
