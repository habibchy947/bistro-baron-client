import { loadStripe } from "@stripe/stripe-js";
import Header from "../../../Components/Header";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    return (
        <div>
            <Header heading="Payment" subHeading="Please pay to eat"></Header>
            <div className="w-6/12 mx-auto mt-20">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;