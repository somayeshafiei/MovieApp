import { Dialog } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalDelete({ setIsOpen, isOpen, dataDispatch, item }: any) {
  const notify = () => {
    toast.error('فیلم مورد نظر حذف شد', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <Dialog className="" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-neutral-600/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-52 bg-red-100 p-5 ">
          <Dialog.Description>
            <p>آیا از حذف این فیلم مطمئن هستید؟</p>
          </Dialog.Description>
          <button
            className="bg-green-500 p-2 px-3"
            onClick={() => setIsOpen(false)}
          >
            خیر
          </button>
          <button
            className="bg-red-500  p-2 px-3"
            onClick={() => {
              dataDispatch({
                type: 'Delete_data',
                payload: item,
              });
              setIsOpen(false);
              notify();
            }}
          >
            بله
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ModalDelete;
