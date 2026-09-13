/* eslint-disable react/prop-types */

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";

import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, {
    message: "Company name is required",
  }),

  logo: z
    .any()
    .refine(
      (file) =>
        file &&
        file[0] &&
        (file[0].type === "image/png" ||
          file[0].type === "image/jpeg"),
      {
        message: "Only PNG and JPEG images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
      reset();
    }
  }, [dataAddCompany, fetchCompanies, reset]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Add a New Company
          </DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 p-4 pb-0"
        >
          {/* Company Name */}
          <Input
            placeholder="Company name"
            {...register("name")}
          />

          {/* Company Logo */}
          <Input
            type="file"
            accept="image/png,image/jpeg"
            className="file:text-gray-500"
            {...register("logo")}
          />

          {/* Add Button */}
          <Button
            type="submit"
            variant="destructive"
            className="w-40"
            disabled={loadingAddCompany}
          >
            {loadingAddCompany ? "Adding..." : "Add"}
          </Button>
        </form>

        <DrawerFooter>
          {/* Name Error */}
          {errors.name && (
            <p className="text-red-500">
              {errors.name.message}
            </p>
          )}

          {/* Logo Error */}
          {errors.logo && (
            <p className="text-red-500">
              {errors.logo.message}
            </p>
          )}

          {/* API Error */}
          {errorAddCompany?.message && (
            <p className="text-red-500">
              {errorAddCompany.message}
            </p>
          )}

          {/* Loader */}
          {loadingAddCompany && (
            <BarLoader
              width={"100%"}
              color="#36d7b7"
            />
          )}

          {/* Cancel */}
          <DrawerClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;