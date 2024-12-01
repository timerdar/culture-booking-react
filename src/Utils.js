class Utils{
    static formatDate(input_date){
        const date = new Date(input_date);

        const formattedDate = date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        });

        const formattedTime = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        });

        return `${formattedDate} ${formattedTime}`
    }
}

export default Utils;