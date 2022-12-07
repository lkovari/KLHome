export class TextUtils {
    static countTextRow(text: string): number | undefined {
        const cnt = text.split('\n').length;
        return cnt;
      }
}