import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../../api/API";
import { useAppSelector } from "../../../store/hooks";

function BooksAddForm() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<any>();
  const [totalCopies, setTotalCopies] = useState<string>('');
  const [availableCopies, setAvailableCopies] = useState<string>('');
  const { booksAPI } = API();
  const navigate = useNavigate();
  const currentLibrary = useAppSelector(state => state.libraries.currentLibrary);

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (title.length < 5 && title.length > 50) {
        iziToast.warning({
          message: 'Вне диапозона 5 - 50 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (author.length < 5 && author.length > 50) {
        iziToast.warning({
          message: 'Вне диапозона 5 - 50 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (description.length > 0 && description.length > 200) {
        iziToast.warning({
          message: 'Превышает 200 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (Object.keys(images).length > 10) {
        iziToast.warning({
          message: 'Больше 5 картинок!',
          position: 'bottomCenter',
        });
        return;
      }

      let isExtValid = true;
      if (Object.keys(images).length > 0) {
        for (const key in images) {
          if (Object.prototype.hasOwnProperty.call(images, key)) {
            const image = images[key];
            if (!image.type.includes('image')) {
              isExtValid = false;
              break;
            }
          }
        }
      }
      
      if (!isExtValid) {
        iziToast.warning({
          message: 'Формат не соответствует jpg, jpeg, png, webp!',
          position: 'bottomCenter',
        });
        return;
      }

      const formData = new FormData();
      formData.append('library', currentLibrary._id);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('year', year);
      formData.append('description', description);
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          const image = images[key];
          formData.append('images', image);
        }
      }
      formData.append('totalCopies', totalCopies);
      formData.append('availableCopies', availableCopies);
      
      booksAPI.addBook(formData)
        .then(result => {
          iziToast.success({
            message: `Книга ${result.data.title} успешно добавлена`,
            position: 'bottomCenter',
          });

          navigate(-1);
        })
        .catch(err => {
          iziToast.error({
            message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
            position: 'bottomCenter',
          });
        });
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={formHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Название книги (5 - 50 символов)</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите название книги" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Автор книги (5 - 50 символов)</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите автора книги" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Год издания</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите год издания" value={year} onChange={(e) => setYear(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Описание (необязательно, не более 200 символов)</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={200} placeholder="Введите описание книги" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите фото книги (не более 5)</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={(e: any) => setImages(e.target.files)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Общее количество экземпляров</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите количество" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Доступное количество экземпляров</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите количество" value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} required />
      </Form.Group>
      
      <Button variant="success" type="submit">
        Создать
      </Button>{' '}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default BooksAddForm
