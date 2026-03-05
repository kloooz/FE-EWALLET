import React from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

export default function PaymentCallback() {
    const { status } = useParams()
    const [searchParams] = useSearchParams()
    const orderId = searchParams.get('order_id')
    const statusCode = searchParams.get('status_code')
    const transactionStatus = searchParams.get('transaction_status')
    const [verifying, setVerifying] = React.useState(!!orderId)

    React.useEffect(() => {
        if (!orderId) return
        import('../api/axios').then(({ default: api }) => {
            api.post(`/transactions/${orderId}/verify`)
                .then(() => setVerifying(false))
                .catch(() => setVerifying(false))
        })
    }, [orderId])

    let title = 'Payment Status'
    let message = verifying ? 'Verifying your payment with Midtrans...' : 'Processing your payment status...'
    let color = 'bg-blue-50 text-blue-800'
    let icon = (
        <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )

    if (status === 'finish' || transactionStatus === 'settlement' || transactionStatus === 'capture') {
        title = 'Payment Successful'
        message = 'Your payment has been successfully completed. Your balance will be updated shortly once the system verifies the transaction.'
        color = 'bg-green-50 text-green-800'
        icon = (
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    } else if (status === 'error' || transactionStatus === 'deny' || transactionStatus === 'cancel' || transactionStatus === 'expire') {
        title = 'Payment Failed'
        message = 'Sorry, your payment could not be completed or has expired.'
        color = 'bg-red-50 text-red-800'
        icon = (
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    } else if (status === 'unfinish' || transactionStatus === 'pending') {
        title = 'Payment Pending'
        message = 'Your payment is still pending. Please complete the payment using your selected method.'
        color = 'bg-yellow-50 text-yellow-800'
        icon = (
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }

    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
                    {icon}
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <div className={`p-4 rounded-lg mb-6 ${color}`}>
                        <p className="text-sm">{message}</p>
                        {orderId && (
                            <p className="text-xs mt-2 font-mono opacity-80">Order ID: {orderId}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="/dashboard" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                            Back to Dashboard
                        </Link>
                        <Link to="/transactions" className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                            View Transactions
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
