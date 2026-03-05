import React from 'react'
import MainLayout from '../layouts/MainLayout'

export default function About() {
    return (
        <MainLayout>
            <div className="mb-6 border-b pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    About DANAKU
                </h2>
                <p className="text-sm text-slate-500 mt-1">Discover what makes our digital wallet special</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Digital Wallet</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        DANAKU is a modern digital wallet application aimed at simplifying your daily transactions.
                        Enjoy seamless money transfers, quick QR payments, and easy balance top-ups in just a few taps.
                        We prioritize your security and convenience every step of the way.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Customer Service</h3>
                    <p className="text-sm text-slate-600 mb-4">
                        Need help or have questions about your account? Our customer service team is here to support you 24/7.
                    </p>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="text-sm font-medium text-slate-700">Call Center: <br /> 1500-123</div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="text-sm font-medium text-slate-700">Email: <br /> cs@danaku.id</div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="text-sm font-medium text-slate-700">Operating Hours: <br /> 24 Hours / 7 Days</div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
