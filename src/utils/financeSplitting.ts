
export const calculateIncomeSplits = (amount: number) => {
  return {
    savings: Math.round(amount * 0.2),    // 20% for savings
    wants: Math.round(amount * 0.3),      // 30% for wants
    needs: Math.round(amount * 0.5)       // 50% for needs
  };
};
