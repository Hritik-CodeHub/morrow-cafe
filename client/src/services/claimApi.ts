export interface ClaimRequest {
  name: string;
  phone: string;
}

export interface ClaimResponse {
  success: boolean;
  claimCode: string;
  message: string;
}

export async function claimOffer(
  data: ClaimRequest
): Promise<ClaimResponse> {
  // Mock API latency
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  const claimCode = `MORROW-${Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase()}`;

  return {
    success: true,
    claimCode,
    message: "Your offer has been claimed.",
  };
}