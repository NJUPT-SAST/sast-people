"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";

const QRCodeScanner: React.FC = () => {
    const [data, setData] = useState("请输入学号或扫描身份二维码");

    return (
        <div >
            <div className='flex'>
                <text className="font-semibold text-lg flex-none text-center">扫描结果:</text>   
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
                />
                <div className="flex-none">  
                    <Button size="sm" >开始阅卷</Button>
                </div>
            
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