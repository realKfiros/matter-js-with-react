import {Game} from "./game";
import {RefObject, useContext, useEffect, useRef} from "react";
import {Modal} from 'bootstrap';
import {css} from "@emotion/react";
// @ts-ignore
import {AwesomeButton} from 'react-awesome-button';
import {AppContext} from "./store";
import {observer} from "mobx-react-lite";

const appStyle = css`
	justify-content: center;
	align-items: center;
	> .modal {
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		background-color: transparent;
	}
`;
export const App = observer(() =>
{
	const dialogRef: RefObject<any> = useRef<HTMLDivElement>(null);
	const {playing, setPlaying}: any = useContext(AppContext);

	useEffect(() =>
	{
		if (!playing)
			showModal();
		else
			hideModal();
	}, [playing]);

	const showModal = () =>
	{
		const dialog = new Modal(dialogRef.current, {
			backdrop: 'static',
			keyboard: false
		});
		dialog.show();
	};

	const hideModal = () =>
	{
		if (dialogRef.current)
		{
			const dialog = Modal.getInstance(dialogRef.current);
			dialog?.hide();
			$('.modal-backdrop').remove();
		}
	};

	return <div css={appStyle}>
		<div className="modal fade" tabIndex={-1} aria-hidden="true" aria-labelledby="modalTitle" ref={dialogRef}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header" id="modalTitle">Matter JS with React!</div>
					<div className="modal-body">Isn't it nice???</div>
					<div className="modal-footer">
						<AwesomeButton type="secondary" onPress={() => setPlaying(true)} disabled={false}>Start!</AwesomeButton>
					</div>
				</div>
			</div>
		</div>
		<Game />
	</div>;
});
