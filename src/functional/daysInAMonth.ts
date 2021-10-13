export const daysInAMonth: any = {
	"01": 31,
	"02": 28,
	"03": 31,
	"04": 30,
	"05": 31,
	"06": 30,
	"07": 31,
	"08": 31,
	"09": 30,
	"10": 31,
	"11": 30,
	"12": 31,
}

export const getDaysInAMonth = (month: string) => {
    const days = daysInAMonth[month];
    const reVal = [];
    for (let i = 1; i <= days; i++) {
        reVal.push(String(i));
    }
    return reVal;
}