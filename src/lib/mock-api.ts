export async function retryFailedPost(): Promise<void> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 1000);
  });

  if (Math.random() < 0.2) {
    throw new Error("The post could not be retried. Please try again.");
  }
}
