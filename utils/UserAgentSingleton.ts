import { isMobileDevice } from './device';

export default class UserAgentSingleton {
  private deviceType: string | null;

  constructor(deviceType: string | null) {
    this.deviceType = deviceType;

    this.persist(deviceType);
  }

  persist(deviceType: string | null) {
    if (process.browser && deviceType) {
      localStorage.setItem('device-type', deviceType);
    }
  }

  get() {
    if (process.browser && !this.deviceType) {
      this.deviceType = JSON.parse(localStorage.getItem('user-agent') ?? 'unknown');
    }

    return this.deviceType ?? 'unknown';
  }

  isMobileDevice() {
    const deviceType = this.get();

    return isMobileDevice(deviceType);
  }
}
