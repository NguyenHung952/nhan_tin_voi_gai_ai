export function detectEmotion(text) {
  const value = text.toLowerCase();

  if (
    value.includes("mệt") ||
    value.includes("tụt") ||
    value.includes("buồn")
  ) {
    return {
      emotion: "Tụt mood",
      energy: "Thấp"
    };
  }

  return {
    emotion: "Trung tính",
    energy: "Ổn"
  };
}
