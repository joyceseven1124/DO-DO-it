export default function dragDropHandle(e: any,thisPageDay:number[],isTagsArray:{[key:string]:any}[],chooseCell:number[][],yearNumber:number,monthNumber:number){
    if (e.target.id) {
        const searchDataTime = `${yearNumber}Y${monthNumber}M`;
        const allConnectWidth = Number(
            e.dataTransfer.getData('allConnectWidth')
        );
        
        const startOldTag = Number(e.dataTransfer.getData('startOldTag'));
        const endOldTag = startOldTag + allConnectWidth / 100 - 1;
        const insertPlace = e.dataTransfer.getData('insertPlace');
        const index = e.dataTransfer.getData('index');
        let date = Number(e.target.className.split(' ')[3]);
        let startId: number = Number(e.target.id.split('-')[1]);
        let endId: number = startId + allConnectWidth / 100 - 1;
        let startDate: number = date;
        let endDate: number = thisPageDay[endId - 1];
        let tagArray = [...isTagsArray];
        let chooseCellArray = [...chooseCell];
        let updateData;
        let yearStart = yearNumber
        let yearEnd = yearNumber
        let monthStart = monthNumber;
        let monthEnd = monthNumber;
        let title
        let description
        let color
        let toDoListStatus
        let receiveEmail: string[];
        let sendEmail: string;
        let sendEmailName: string;
       
        

        if(thisPageDay.length < endId){
            let extraDay = endId - thisPageDay.length
            startId = startId - extraDay
            startDate = thisPageDay[startId-1]
            endId = thisPageDay.length
            endDate = thisPageDay[endId-1]
        }

        if (allConnectWidth <= 700) {
            if (insertPlace !== 0) {
                startId = startId - (insertPlace - 1);
                startDate = thisPageDay[startId - 1];
                endId = startId + allConnectWidth / 100 - 1;
                endDate = thisPageDay[endId - 1];
            }
        }
        const perRowStartNumber = [1, 8, 15, 22, 29, 36];
        const perRowEndNumber = [7, 14, 21, 28, 35, 42];
        let newTagArray = tagArray.filter((element:any) => {
            let connectTagValueIndex = element.index;
            if (connectTagValueIndex.toString() !== index) {
                return element;
            } else {
                title = element.title
                description = element.description
                color = element.color
                toDoListStatus = element.status
                receiveEmail = element.receiveEmail
                sendEmail = element.sendEmail
                sendEmailName = element.sendEmailName
            }
        });
        if (startId < 7 && startDate > 7) {
                monthStart = monthNumber - 1;
                if(monthStart === 0){
                    monthStart = 12
                    yearStart = yearNumber - 1
                }
        }

        if (startId > 28 && startDate < 7) {
            monthStart = monthNumber + 1;
            if(monthStart === 13){
                monthStart = 1
                yearStart = yearNumber + 1
            }
        }

        if (endId < 7 && endDate > 7) {
            monthEnd = monthNumber - 1;
            if(monthEnd === 0){
                monthEnd = 12
                yearEnd = yearNumber - 1
            }
        }

        if (endId > 28 && endDate < 7) {
            monthEnd = monthNumber + 1;
            if(monthEnd === 13){
                monthEnd = 1
                yearEnd = yearNumber + 1
            }
        }

        const firstRowEndId = perRowEndNumber[Math.ceil(startId/7)-1]
        const rowEnd = Math.ceil(endId/7)
        const rowStart = Math.ceil(startId/7)
        let allWidth = allConnectWidth
        if(rowEnd !== rowStart){
            let upDateArray = []
            let tagItem ={}
            let firstTagWidth = (Math.abs(startId-firstRowEndId)+1)*100
            if(startId === firstRowEndId){
                firstTagWidth = 100
            }
            tagItem = {
                id: startId,
                width: firstTagWidth,
                title: title,
                description: description,
                connectWidth: allConnectWidth,
                color: color,
                index: index,
                status: toDoListStatus,
                yearStart: yearStart,
                yearEnd: yearEnd,
                monthStart: monthStart,
                monthEnd: monthEnd,
                dayStart: startDate,
                dayEnd: endDate,
                receiveEmail: receiveEmail,
                sendEmail: sendEmail,
                sendEmailName: sendEmailName,}
            newTagArray.push(tagItem)
            upDateArray.push(tagItem)
            allWidth = allWidth - firstTagWidth
            if(Math.abs(rowEnd-rowStart)>=2){
                for(let i = rowStart+1; i<rowEnd;i++ ){
                    let otherTagStartId = perRowStartNumber[i-1]
                    let otherTagWidth = 700
                    const tagItem = {
                        id: otherTagStartId,
                        width: otherTagWidth,
                        title: title,
                        description: description,
                        connectWidth: allConnectWidth,
                        color: color,
                        index: index,
                        status: toDoListStatus,
                        yearStart: yearStart,
                        yearEnd: yearEnd,
                        monthStart: monthStart,
                        monthEnd: monthEnd,
                        dayStart: startDate,
                        dayEnd: endDate,
                        receiveEmail: receiveEmail,
                        sendEmail: sendEmail,
                        sendEmailName: sendEmailName,}
                    newTagArray.push(tagItem)
                    upDateArray.push(tagItem)
                    allWidth = allWidth - otherTagWidth
                }
            }
            let endTagWidth = allWidth
            if(endTagWidth>0){
                let endTagStartId = perRowStartNumber[Math.ceil(endId/7)-1]
                const tagItem = {
                    id: endTagStartId,
                    width: endTagWidth,
                    title: title,
                    description: description,
                    connectWidth: allConnectWidth,
                    color: color,
                    index: index,
                    status: toDoListStatus,
                    yearStart: yearStart,
                    yearEnd: yearEnd,
                    monthStart: monthStart,
                    monthEnd: monthEnd,
                    dayStart: startDate,
                    dayEnd: endDate,
                    receiveEmail: receiveEmail,
                    sendEmail: sendEmail,
                    sendEmailName: sendEmailName,}
                newTagArray.push(tagItem)
                upDateArray.push(tagItem)
            }
            updateData = [...upDateArray]
        }else{
            const tagItem = {
                id: startId,
                width: allWidth,
                title: title,
                description: description,
                connectWidth: allConnectWidth,
                color: color,
                index: index,
                status: toDoListStatus,
                yearStart: yearStart,
                yearEnd: yearEnd,
                monthStart: monthStart,
                monthEnd: monthEnd,
                dayStart: startDate,
                dayEnd: endDate,
                receiveEmail: receiveEmail,
                sendEmail: sendEmail,
                sendEmailName: sendEmailName,
            };
            newTagArray.push(tagItem)
            updateData = tagItem
        }
        let newChooseAllCells = chooseCellArray.filter((element) => {
            const start = element[0];
            const end = element[element.length - 1];
            if (start !== startOldTag || end !== endOldTag) {
                return element;
            }
        });
        let newChooseCell = [];
        for (let i = startId; i <= endId; i++) {
            newChooseCell.push(i);
        }
        newChooseAllCells.push(newChooseCell);

        return {newTagArray:newTagArray,newChooseAllCells:newChooseAllCells,time:searchDataTime,index:index,updateData:updateData}
    }
};

