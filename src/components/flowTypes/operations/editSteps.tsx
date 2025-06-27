'use client';
import { batchUpdate } from '@/action/flow/edit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { fullStepType, stepType } from '@/types/step';
import { Copy, Navigation, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// export const EditSteps = ({ data }: { data: flowTypeType }) => {
// TODO: v2 db 
// export const EditSteps = () => {
//   // TODO: v2 db
//   // const editFlowForm = useForm<z.infer<typeof addFlowTypeSchema>>({
//   //   resolver: zodResolver(addFlowTypeSchema),
//   //   defaultValues: {
//   //     name: data.name,
//   //     description: data.description,
//   //   },
//   // });
//   // const { isSubmitting } = editFlowForm.formState;
//   const [openEdit, setOpenEdit] = useState(false);
//   // const [stepList, setStepList] = useState<stepType[]>(data.steps);
//   const [stepList, setStepList] = useState<stepType[]>([]);
//   return (
//     <Sheet open={openEdit} onOpenChange={setOpenEdit}>
//       <SheetTrigger asChild>
//         <Button size={'sm'} variant={'ghost'}>
//           编辑流程
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full md:w-3/4 overflow-scroll">
//         <SheetHeader>
//           <SheetTitle>流程编辑</SheetTitle>
//           <SheetDescription>
//             在下方编辑流程的基本信息与流程的步骤
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           {/* TODO: v2 db */}
//           {/* <Form {...editFlowForm}>
//             <FormField
//               control={editFlowForm.control}
//               name="name"
//               disabled={isSubmitting}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>流程名称</FormLabel>
//                   <FormControl>
//                     <Input placeholder="填写展示的流程名称" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={editFlowForm.control}
//               name="description"
//               disabled={isSubmitting}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>流程描述</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="填写展示的流程描述"
//                       {...field}
//                       value={field.value || ''}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </Form> */}
//           <div className="flex justify-end mt-4">
//             <Button
//               size="sm"
//               variant="ghost"
//               onClick={() => {
//                 setStepList((prev) => [
//                   ...prev,
//                   {
//                     label: '',
//                     order: prev.length + 1,
//                     name: '',
//                     description: '',
//                   },
//                 ]);
//               }}
//             >
//               <Plus size={18} />
//               添加步骤
//             </Button>
//           </div>
//           {stepList.map((step, index) => {
//             return (
//               <fieldset
//                 className="grid gap-6 rounded-lg border p-4"
//                 key={`step${index}`}
//               >
//                 <legend className="-ml-1 px-1 text-sm font-medium text-muted-foreground">
//                   步骤 {index + 1}
//                 </legend>
//                 <div className="grid gap-3">
//                   <Label htmlFor={`step-${index}-id`}>
//                     步骤标示符（纯英文）
//                   </Label>
//                   <Input
//                     id={`step-${index}-id`}
//                     placeholder="填写展示的步骤标示符"
//                     className="w-full"
//                     defaultValue={step.label}
//                     onChange={(e) => {
//                       setStepList((prev) => [
//                         ...prev.slice(0, index),
//                         {
//                           ...prev[index],
//                           label: e.target.value,
//                         },
//                         ...prev.slice(index + 1),
//                       ]);
//                     }}
//                   />
//                 </div>
//                 <div className="grid gap-3">
//                   <Label htmlFor={`step-${index}-name`}>步骤名称</Label>
//                   <Input
//                     id={`step-${index}-name`}
//                     placeholder="填写展示的步骤名称"
//                     className="w-full"
//                     defaultValue={step.name}
//                     onChange={(e) => {
//                       setStepList((prev) => [
//                         ...prev.slice(0, index),
//                         {
//                           ...prev[index],
//                           name: e.target.value,
//                         },
//                         ...prev.slice(index + 1),
//                       ]);
//                     }}
//                   />
//                 </div>
//                 <div className="grid gap-3">
//                   <Label htmlFor={`step-${index}-description`}>步骤描述</Label>
//                   <Textarea
//                     id={`step-${index}-description`}
//                     placeholder="填写展示的步骤名称"
//                     className="w-full"
//                     defaultValue={step.description || ''}
//                     onChange={(e) => {
//                       setStepList((prev) => [
//                         ...prev.slice(0, index),
//                         {
//                           ...prev[index],
//                           description: e.target.value,
//                         },
//                         ...prev.slice(index + 1),
//                       ]);
//                     }}
//                   />
//                 </div>

//                 <div className="flex justify-end">
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     className="m-0"
//                     onClick={() => {
//                       const stepData = stepList[index] as fullStepType;
//                       const prevStep = index > 0 ? stepList[index - 1] as fullStepType : null;
//                       toast.promise(
//                         batchUpdate(stepData.flowTypeId, stepData.id, prevStep?.id),
//                         {
//                           loading: '正在将所有人设置到该步骤',
//                           success: '设置成功',
//                           error: '设置失败',
//                         },
//                       );

//                     }}
//                   >
//                     <Navigation size={18} />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     className="m-0"
//                     onClick={() => {
//                       // duplicate the step
//                       setStepList((prev) => [
//                         ...prev.slice(0, index + 1),
//                         {
//                           ...prev[index],
//                           order: prev.length + 1,
//                         },
//                         ...prev.slice(index + 1),
//                       ]);
//                     }}
//                   >
//                     <Copy size={18} />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     className="m-0"
//                     onClick={() => {
//                       setStepList((prev) => prev.filter((_, i) => i !== index));
//                     }}
//                   >
//                     <Trash2 size={18} />
//                   </Button>
//                 </div>
//               </fieldset>
//             );
//           })}
//         </div>
//         <SheetFooter>
//           {/* TODO: v2 db */}
//           {/* <Button
//             type="submit"
//             loading={isSubmitting}
//             disabled={isSubmitting || stepList.length === 0}
//             onClick={editFlowForm.handleSubmit(async (val) => {
//               toast.promise(
//                 async () => {
//                   // TODO: v2 db 
//                   // await updateFlowType(data.id, val, stepList).then(() => {
//                   //   setOpenEdit(false);
//                   //   editFlowForm.reset();
//                   // });
//                 },
//                 {
//                   loading: '正在编辑',
//                   success: `${val.name} 已修改成功`,
//                   error: '修改的时候出现了问题，请稍后重试',
//                 },
//               );
//             })}
//           >
//             确认修改
//           </Button> */}
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };
