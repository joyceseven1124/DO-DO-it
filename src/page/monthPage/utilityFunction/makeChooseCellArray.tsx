export default function makeChooseCellArray(
            tagStartCell: number,
            tagEndCell: number,
            status: string,
            chooseCell:number[][]
        ) {
        let prevChooseCell: any;
        if (status === 'usual') {
            prevChooseCell = [...chooseCell];
        } else {
            prevChooseCell = [];
        }

        let nowChooseCell = [];
        if (tagStartCell > tagEndCell) {
            for (let i = tagEndCell; i <= tagStartCell; i++) {
                nowChooseCell.push(i);
            }
        } else if (tagStartCell < tagEndCell) {
            for (let i = tagStartCell; i <= tagEndCell; i++) {
                nowChooseCell.push(i);
            }
        } else {
            let oneCell = tagStartCell;
            nowChooseCell.push(oneCell);
        }
        prevChooseCell.push(nowChooseCell);
        return prevChooseCell;
}