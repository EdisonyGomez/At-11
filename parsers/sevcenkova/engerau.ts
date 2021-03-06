import { IMenuItem } from "../IMenuItem";
import { IParser } from "../IParser";
import { Zomato } from "../zomato";

export class Engerau extends Zomato implements IParser {
    public parse(html: string, date: Date, doneCallback: (menu: IMenuItem[]) => void): void {

        const menuItems = super.parseBase(html, date);

        let price = NaN;
        // shift price from soup to meals
        menuItems.forEach(item => {
            if (item.isSoup) {
              price = item.price;
              item.price = NaN;
            } else {
              item.price = price;
            }
            item.text = normalize(item.text);
            return item;
        });

        doneCallback(menuItems);

        function normalize(str: string): string {
            return str.replace(/\*.*$/, "");
        }
    }
}
