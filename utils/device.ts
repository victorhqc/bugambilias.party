export function isMobileDevice(deviceType: string) {
  if (deviceType === 'mobile' || deviceType === 'wearable') {
    return true;
  }

  return false;
}
