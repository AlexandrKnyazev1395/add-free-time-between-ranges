module.exports = function (startDate, endDate, isSlpitByHour) {

    const totalDurationInHours = (endDate - startDate) / 1000 / 60 / 60;

    const freeSlotDateStart = startDate;
    const freeSlotDateEnd = endDate;
    let freeSlotsByHour = [];

    if (isSlpitByHour) {
        let tempHour = freeSlotDateStart.getHours();
        let tempDateStart = new Date(freeSlotDateStart);
        tempHour += 1;
        let tempDateEnd = new Date(freeSlotDateStart.setHours(tempHour, 0, 0, 0));
        const endHour = freeSlotDateEnd.getHours();
        while (tempHour <= endHour) {
            const durationInHours = (tempDateEnd - tempDateStart) / 1000 / 60 / 60;
            freeSlotsByHour.push({
                durationInHours,
                freeSlotDateStart: new Date(tempDateStart),
                freeSlotDateEnd: new Date(tempDateEnd)
            });
            tempDateStart = new Date(tempDateEnd.setHours(tempHour, 0, 0, 0));
            tempHour += 1;
            tempDateEnd = new Date(tempDateEnd.setHours(tempHour, 0, 0, 0));
        }
        tempDateEnd = new Date(freeSlotDateEnd);
        if (tempDateEnd.getTime() - tempDateStart.getTime() > 1000) {
            const durationInHours = (tempDateEnd - tempDateStart) / 1000 / 60 / 60;
            freeSlotsByHour.push({
                durationInHours,
                freeSlotDateStart: tempDateStart,
                freeSlotDateEnd: tempDateEnd
            })
        }
    }

    return {
        totalDurationInHours,
        freeSlotDateStart,
        freeSlotDateEnd,
        freeSlotsByHour
    }

}