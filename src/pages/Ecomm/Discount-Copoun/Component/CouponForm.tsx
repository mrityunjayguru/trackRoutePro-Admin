import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { addcoupon, setUpdatecoupon, updatecoupon } from "../../../../api/ecomm/coupon";

interface CouponFormData {
  discountCode: string;
  discountPercent: number;
  discountValue: number;
  discountStart: string;
  discountEnd: string;
  _id:any
}

const schema = yup.object().shape({
  discountCode: yup.string().required("Discount code is required"),
  discountPercent: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Minimum is 0")
    .max(100, "Maximum is 100")
    .required("Discount percent is required"),
  discountValue: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Discount value is required"),
});

function CouponForm() {
  const dispatch = useDispatch<AppDispatch>();
  const updatecouponRecord = useSelector((state: any) => state?.coupon?.updateCoupon);
console.log(updatecouponRecord,"updatecouponRecord")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormData>({
    resolver: yupResolver(schema),
  });

  // Fill form when updatecouponRecord exists
  useEffect(() => {
    if (updatecouponRecord) {
      reset({
        discountCode: updatecouponRecord.discountCode || "",
        discountPercent: updatecouponRecord.discountPercent || 0,
        discountValue: updatecouponRecord.discountValue || 0,
        discountStart: updatecouponRecord.discountStart?.slice(0, 10) || "", // Trim date
        discountEnd: updatecouponRecord.discountEnd?.slice(0, 10) || "",
      });
    }
  }, [updatecouponRecord, reset]);

  const onSubmit = async (data: CouponFormData) => {
    try {
      const payload:any={
        ...data
      }
      console.log(data)
      if(updatecouponRecord?._id){
        const payload1:any={
          ...payload,
          _id:updatecouponRecord?._id
        }
      await dispatch(updatecoupon(payload1));
      }else{
      await dispatch(addcoupon(payload));
      }
      const payload2:any=null
    dispatch(setUpdatecoupon(payload2))
      
      reset(); // Clear the form
    } catch (error) {
      console.error("Failed to add/update coupon:", error);
    }
  };

  return (
    <div>
      <h2 className="text-gray-700 font-semibold mb-4">
        {updatecouponRecord ? "Update Coupon" : "Create Coupon"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Enter Discount Code"
            {...register("discountCode")}
            className="border p-2 rounded w-full"
          />
          {errors.discountCode && <p className="text-red-500 text-sm">{errors.discountCode.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="%"
            {...register("discountPercent")}
            className="border p-2 rounded w-full"
          />
          {errors.discountPercent && <p className="text-red-500 text-sm">{errors.discountPercent.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Discount Value"
            {...register("discountValue")}
            className="border p-2 rounded w-full"
          />
          {errors.discountValue && <p className="text-red-500 text-sm">{errors.discountValue.message}</p>}
        </div>

        <div>
          <input
            type="date"
            {...register("discountStart")}
            className="border p-2 rounded w-full"
          />
          {errors.discountStart && <p className="text-red-500 text-sm">{errors.discountStart.message}</p>}
        </div>

        <div>
          <input
            type="date"
            {...register("discountEnd")}
            className="border p-2 rounded w-full"
          />
          {errors.discountEnd && <p className="text-red-500 text-sm">{errors.discountEnd.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-2 mt-4 px-6 py-2 bg-black text-lime-400 font-semibold rounded disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : updatecouponRecord ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>
    </div>
  );
}

export default CouponForm;
