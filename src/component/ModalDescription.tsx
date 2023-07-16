import { Dialog } from '@headlessui/react';

function ModalDescriptionComponent({ setIsOpen, description, isOpen }: any) {
  return (
    <Dialog className="" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-neutral-600/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="md:w-[40rem] md:h-72 p-4 rounded-md bg-neutral-300 md:px-6">
          <Dialog.Description>
            <div className="w-full flex justify-between pb-5">
              <h3 className="font-bold">توضیحات</h3>
              <button
                className="flex gap-2 text-gray-500 text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span>بستن</span>X
              </button>
            </div>
            <div className="border border-gray-700 rounded w-full h-44 p-1">
              <p className="text-sm">{description.description}</p>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ModalDescriptionComponent;
