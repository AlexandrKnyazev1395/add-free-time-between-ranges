module.exports = function (timeSlots) {
    return timeSlots.sort((slot1, slot2) => {
        const date1 = new Date(slot1.dateStart);
        const date2 = new Date(slot2.dateStart)
        return date1 - date2;
    })
}