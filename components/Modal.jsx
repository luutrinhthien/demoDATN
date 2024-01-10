import { useState } from 'react';

const LoadingModal = ({ showModal, setShowModal }) => {

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
            >
                Open Modal
            </button>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >

                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className='flex'>
                                            <h3
                                                className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-headline"
                                            >
                                                Loading...
                                            </h3>
                                            <div class="loading-spinner mb-2 ml-8 mt-[-4px]"></div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm leading-5 text-gray-500">
                                                Please wait for your transaction.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingModal;
