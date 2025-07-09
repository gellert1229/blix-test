import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { BottomSheetModal } from "@/components/BottomSheetModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const BUTTON_COLOR = "#2563EB"; // Nice blue color that works well in both modes

const HomePage = () => {
  const colorScheme = useColorScheme();
  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#3A3AA" : "#F5F5F5" },
      ]}
    >
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.greeting}>
          Hi! 👋
        </ThemedText>
        <ThemedText type="subtitle" style={styles.name}>
          I'm Gellert
        </ThemedText>
        <ThemedText type="default" style={styles.description}>
          This is my solution for the take home test.
        </ThemedText>
        <ThemedText type="default" style={styles.instruction}>
          Please press the button below to trigger the bottom sheet component
        </ThemedText>
      </ThemedView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: BUTTON_COLOR }]}
        onPress={handleOpen}
      >
        <ThemedText style={styles.buttonText}>Open Bottom Sheet</ThemedText>
      </TouchableOpacity>

      <BottomSheetModal
        isVisible={isVisible}
        onClose={handleClose}
        title="Ask me"
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  greeting: {
    marginBottom: 8,
  },
  name: {
    marginBottom: 24,
  },
  description: {
    textAlign: "center",
    marginBottom: 12,
    opacity: 0.9,
  },
  instruction: {
    textAlign: "center",
    opacity: 0.8,
  },
  button: {
    position: "absolute",
    bottom: 50,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalDescription: {
    opacity: 0.8,
    lineHeight: 24,
  },
});

export default HomePage;
