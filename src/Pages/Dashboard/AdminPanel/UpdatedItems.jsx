import Swal from "sweetalert2";
import { uploadImage } from "../../../Utils/utils";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const UpdatedItems = () => {
    const axiosSecure = useAxiosSecure()
    const {name,category,recipe,price, _id} = useLoaderData()
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        const image = data.image[0]
        const photo = await uploadImage(image)
        const menuItem = {
            name: data.name,
            recipe: data.recipe,
            image: photo,
            category: data.category,
            price: parseFloat(data.price)
        }

        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(menuRes)
        if (menuRes.data.modifiedCount > 0) {
            reset()
            Swal.fire({
                position: "middle-center",
                icon: "success",
                title: `${data.name} has been updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });

        }

    }
    return (
        <div className="">
            <h2 className="text-5xl text-center mt-5 font-bold">Update Item</h2>
            <div className="bg-slate-100 my-12 w-10/12 mx-auto p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    {/* name field */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </div>
                        <input defaultValue={name} {...register("name", { required: true })} type="text" placeholder="Recipe Name" className="input  w-full rounded-sm" />
                    </label>
                    <div className="md:flex gap-5">
                        {/* category field */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </div>
                            <select defaultValue={category} {...register("category", { required: true })} className="select rounded-sm w-full">
                                <option disabled value='default'>Pick a category</option>
                                <option>pizza</option>
                                <option>soup</option>
                                <option>dessert</option>
                                <option>salad</option>
                                <option>drinks</option>
                            </select>
                        </label>
                        {/* price field */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Recipe Price*</span>
                            </div>
                            <input defaultValue={price} {...register("price", { required: true })} type="number" placeholder="Price" className="input  w-full rounded-sm" />
                        </label>
                    </div>
                    {/* recipe details field */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Details*</span>
                        </div>
                        <textarea defaultValue={recipe} {...register("recipe", { required: true })} className="textarea textarea-md rounded-sm" placeholder="Write recipe details"></textarea>
                    </label>
                    {/* image file */}
                    <input type="file" {...register("image", { required: true })} className="file-input bg-slate-100 w-full max-w-xs" />
                    <div>
                        <button className="px-10 flex items-center gap-2 py-2 rounded-sm text-white font-semibold bg-gradient-to-tr from-[#835D23] to-[#df9526]">Update Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatedItems;