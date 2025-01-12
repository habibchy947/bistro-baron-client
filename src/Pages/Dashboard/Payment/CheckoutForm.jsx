import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const [ cart , refetch] = useCart()
    const { user } = useAuth()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if(totalPrice > 0 ){
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                    console.log(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('payment method error', error)
            setError(error.message)
        } else {
            console.log('Payment method', paymentMethod)
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })

        if (confirmError) {
            console.log(confirmError, 'confirm error')
        } else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction_id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transaction_id: paymentIntent.id,
                    date: new Date(),
                    cartIds:cart.map(item => item._id),
                    menuItemIds:cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payment', payment)
                console.log(res)
                if (res.data?.paymentResult?.insertedId) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `payment has been saved to database`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border-2 p-5 rounded-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        }
                    }}
                />
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-400">Transaction id : {transactionId}</p>}
                <div
                    className="flex justify-center mt-10">
                    <button
                        type="submit"
                        className="btn btn-primary rounded-md btn-wide"
                        disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;