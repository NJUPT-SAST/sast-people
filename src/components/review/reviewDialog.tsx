import { Input } from "../ui/input";
interface ReviewDialogProps {
    task: string;
}

const ReviewDialog: React.FC=() => {
    const task = localStorage.getItem('task');
    if (task && (parseInt(task) === 0) ){
        return (
            <div>
                <text>请先选择阅卷范围</text>
            </div>
        )
    }
    return (
        <div className="flex mt-1 mb-5">
            <text>Dialog test</text>
            <Input id='test' placeholder={task as string} />
        </div>
    );
}
export default ReviewDialog;