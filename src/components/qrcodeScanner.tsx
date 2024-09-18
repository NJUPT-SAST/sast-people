"use client";
import checkUser from "./review/checkUser";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import ReviewDialog from "./review/reviewDialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ReviewProps {
    task: string;
}

const QRCodeScanner: React.FC =() => {
    const [data, setData] = useState("");
    const [checkUserResult, setCheckUserResult] = useState(false);
    const handleCheckUser = async (data: string) => {
        const checkUserResult = await checkUser(data);
        console.log('114515',checkUserResult);
    };
    useEffect (()=>{
        handleCheckUser(data);
    } ,[data]);
    return (
        <div >
            <div className='flex'>
                <text className="font-semibold text-xl flex-none text-center">考生:</text>   
                <input 
                    type="text" 
                    className="font-semibold text-base grow ml-2 mr-2"
                    //black border
                    style={{
                        border: '1px solid black',
                        borderRadius: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        width:220,
                    }}
                    value={data} 
                    onChange={(e) => setData(e.target.value)} // 添加onChange事件处理器
                    placeholder="请输入考生学号或扫描考生个人识别二维码"
                    
                />
                <Dialog>
                    <DialogTrigger>
                        <div className="flex-none">  
                            <Button size="sm" onClick={()=>{handleCheckUser}}>开始阅卷</Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        {
                            checkUserResult?
                            <div>
                                <DialogHeader className="text-xl">
                                {data}
                                </DialogHeader>
                                <ReviewDialog/>
                            </div>:<div>
                                <text>错误的考生学号，请重新输入或扫描</text>
                            </div>
                        }
                    </DialogContent>
                </Dialog>
            </div>
        <div style={{display: 'flex',justifyContent: 'center',flexDirection:'row'}}>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.getText());
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                constraints={{ facingMode: 'user' }}
                containerStyle={{ width: '80%', height: '60vw', maxWidth: '400px', maxHeight: '300px' }} // 设置宽度为最大宽度的80%，高度为宽度的60%
            />
        </div>
        </div>
    );
};

export default QRCodeScanner;