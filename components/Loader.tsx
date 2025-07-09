import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import SkeletonLoading from "expo-skeleton-loading";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

const SkeletonComponent = SkeletonLoading as any;

export const Loader = () => {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <ThemedView style={styles.aiMessageContainer}>
      <ThemedView style={styles.aiHeader}>
        <ThemedView style={styles.aiAvatar}>
          <ThemedText style={styles.aiAvatarText}>AI</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.aiContent}>
        <SkeletonComponent
          background={isLight ? "#E1E9EE" : "#374151"}
          highlight={isLight ? "#F3F4F6" : "#4B5563"}
        >
          <View
            style={[
              styles.skeletonLine,
              { width: "90%", height: 16, marginBottom: 8 },
            ]}
          />

          <View
            style={[
              styles.skeletonLine,
              { width: "75%", height: 16, marginBottom: 8 },
            ]}
          />

          <View style={[styles.skeletonLine, { width: "60%", height: 16 }]} />
        </SkeletonComponent>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
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
  skeletonLine: {
    borderRadius: 4,
  },
});
