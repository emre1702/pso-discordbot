export class CrontabUtils {
    private static crontabMinuteCounter = -1;

    static getNextHourlyCrontab(): string {
        this.crontabMinuteCounter = (this.crontabMinuteCounter + 1) % 60;
        // Hourly, see: https://crontab.guru/#0_*_*_*_*
        return this.crontabMinuteCounter + " * * * *";
    }
}
