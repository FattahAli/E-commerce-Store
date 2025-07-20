import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCart from "../Hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const productsAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingTotal = items.length > 0 ? 10 : 0;
  const total = productsAmount + shippingTotal;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setOpen(true);
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen bg-background text-foreground w-full">
      {/* Form */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Shipping Information
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border border-[#232b3b] rounded px-3 py-2 bg-card text-foreground text-sm sm:text-base"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-400 text-xs sm:text-sm">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border border-[#232b3b] rounded px-3 py-2 bg-card text-foreground text-sm sm:text-base"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-400 text-xs sm:text-sm">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="w-full border border-[#232b3b] rounded px-3 py-2 bg-card text-foreground text-sm sm:text-base"
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-400 text-xs sm:text-sm">
                {formik.errors.address}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">City</label>
              <input
                name="city"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="w-full border border-[#232b3b] rounded px-3 py-2 bg-card text-foreground text-sm sm:text-base"
              />
              {formik.touched.city && formik.errors.city && (
                <div className="text-red-400 text-xs sm:text-sm">
                  {formik.errors.city}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">ZIP</label>
              <input
                name="zip"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zip}
                className="w-full border border-[#232b3b] rounded px-3 py-2 bg-card text-foreground text-sm sm:text-base"
              />
              {formik.touched.zip && formik.errors.zip && (
                <div className="text-red-400 text-xs sm:text-sm">
                  {formik.errors.zip}
                </div>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full mt-4 sm:mt-6">
            Checkout Now
          </Button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-card border border-[#232b3b] rounded-lg shadow-md p-4 sm:p-6 h-fit flex flex-col gap-4 w-full max-w-md mx-auto lg:mx-0">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
          Order Summary
        </h3>
        <div className="flex justify-between text-gray-300 text-sm sm:text-base">
          <span>Products Amount</span>
          <span>${productsAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm sm:text-base">
          <span>Shipping</span>
          <span>${shippingTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base sm:text-lg mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Successful!</DialogTitle>
            <DialogDescription>
              Thank you for your purchase. Your order has been placed
              successfully.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="w-full mt-4"
          >
            Back to Home
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
