export const Delay = async (ms: number) => {
  return await new Promise((res) => setTimeout(res, ms));
};
