export const viewVariants = (i: number) => ({
  hidden: { y: i, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.6,
    },
  },
  exit: {
    y: -i,
    opacity: 0,
    transition: {
      type: "tween",
      delay: 0,
      ease: "easeInOut",
      duration: 0.5,
    },
  },
});
