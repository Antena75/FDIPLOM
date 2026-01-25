// import iziToast from "izitoast";
// import { useSocket } from "./usesocket/useSocket";
// import { useSocketEvent } from "./usesocket/useSocketEvent";
// import { useSocketSubscribe } from "./usesocket/useSocketSubscribe";
// import { SocketDto } from "../../types/interfaces";
// import { useAppSelector } from "../../store/hooks";

// function SocketHiddenDiv() {
//   const user = useAppSelector(state => state.user);
//   useSocket();
//   useSocketSubscribe();
//   const listener = (socketDto: SocketDto) => {
//     if (user.id !== socketDto.author.id) {
//       iziToast.info({
//         message: `Новое сообщение от пользователя ${socketDto.author.name}`,
//         position: 'bottomCenter',
//       });
//     }
//   };
//   useSocketEvent('subscribeToChat', listener);
//   useSocketEvent('newMessage', listener);

//   return (
//     <></>
//   )
// }

// export default SocketHiddenDiv;
