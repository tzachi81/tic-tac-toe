import classes from './Controls.module.scss';

interface IcontrolsProps {
  onChangeNames: () => void;
  onReset: () => void;
}

export const Controls: React.FC<IcontrolsProps> = ({ onChangeNames, onReset }) => {
  return (
    <div className={classes.controls}>
      <button className={classes.button} onClick={onReset}>New Game</button>
      <button className={classes.button} onClick={onChangeNames}>Change player names</button>
    </div>
  );
};
