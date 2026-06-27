// Bảng màu + biểu tượng cố định cho 4 đáp án (kiểu Kahoot/Quizizz).
export const OPTION_STYLES = [
  { bg: "bg-opt-red", shape: "▲", ring: "ring-opt-red" },
  { bg: "bg-opt-blue", shape: "◆", ring: "ring-opt-blue" },
  { bg: "bg-opt-yellow", shape: "●", ring: "ring-opt-yellow" },
  { bg: "bg-opt-green", shape: "■", ring: "ring-opt-green" },
];

export function optionStyle(i: number) {
  return OPTION_STYLES[i % OPTION_STYLES.length];
}
