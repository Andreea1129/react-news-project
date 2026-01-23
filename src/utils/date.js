// Exportam functia care o sa primeasca ca si parametru o data in format string si returneaza data intr-un format dorit de noi
export function getFormattedDate(dateString) {
    // Folosim constructorul Date pentru a transforma string-ul de data intr-un format de la care noi putem accesa diverse metode pentru a afla informatii despre acea data
    const currentDate = new Date(dateString);
    let month = currentDate.getMonth(); 
    month = month + 1;
    let day = currentDate.getDate();
    const year = currentDate.getFullYear();
    // Ne asiguram ca ziua si luna vor fi in format de genul: 01, 02, 03...09
    if(month < 10) {
        month = `0${month}`; 
    }
    if(day < 10) {
        day = `0${day}`;
    }

    return `${day}/${month}/${year}`;
}