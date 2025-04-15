import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens="table">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </div>
  );
}

/*
      {<Modal>
        <Modal.Open opens="table">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>}
*/
// the modal component should know whether it is currently open or not.
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
