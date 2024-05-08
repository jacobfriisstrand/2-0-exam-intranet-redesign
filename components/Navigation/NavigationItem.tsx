interface NavigationItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export default function NavigationItem({
  children,
  ...props
}: NavigationItemProps) {
  return <li {...props}>{children}</li>;
}
