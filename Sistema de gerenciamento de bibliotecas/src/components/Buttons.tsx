interface ButtonsProps{
    onList : () => void;
    onAdd : () => void;
    onUpdate : () => void;
    onDelete : () => void;
}

export default function Buttons({ onList, onAdd, onUpdate, onDelete }: ButtonsProps) {
    return (
        <div className="buttons-container">
            <button id="list-button" onClick={onList}>Listar Livros</button>
            <button id="add-button" onClick={onAdd}>Adicionar Livro</button>
            <button id="update-button" onClick={onUpdate}>Atualizar Livro</button>
            <button id="delete-button" onClick={onDelete}>Deletar Livro</button>
        </div>
    );
}
