import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setLibrariesState } from "../../../store/slices/librariesSlice";
import { BookData } from "../../../types/interfaces";
import BooksItem from "./BooksItem";

interface BookList {
  list: BookData[],
}

function BooksItems(data: BookList) {
  const booksState = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();
  const { list } = data;

  const handleNextPage = async (data: string) => {
    try {
      if (data === 'plus') {
        dispatch(setLibrariesState({ offset: booksState.offset + booksState.limit }));
      } else if (data === 'minus') {
        dispatch(setLibrariesState({ offset: booksState.offset - booksState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <span>Книги отсутствуют в библиотеке!</span>
        </Container>
      ) : (
        <>
          {list.map(elem =>
            <BooksItem key={elem._id} book={elem} />
          )}
          <Pagination className="mt-3">
            {booksState.offset > 0 && 
              <Pagination.Item onClick={() => handleNextPage('minus')}>
                Назад
              </Pagination.Item>
            }
            {booksState.list.length >= booksState.limit && 
              <Pagination.Item onClick={() => handleNextPage('plus')}>
                Дальше
              </Pagination.Item>
            }
          </Pagination>
        </>
        
      )}
      
    </>
  )
}

export default BooksItems