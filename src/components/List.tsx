import { ReactNode } from 'react';

type ListProps<ItemsType> = {
  items: ItemsType[];
  render: (item: ItemsType, index: number) => ReactNode;
};

export function List<ItemsType>({ items, render }: ListProps<ItemsType>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li>{render(item, index)}</li>
      ))}
    </ul>
  );
}
