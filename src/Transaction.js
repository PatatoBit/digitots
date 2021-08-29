export default function Transaction() {
    return (
        <>
            <form>
                <input type="number" placeholder='Amount'/>
                <input type="number" placeholder='Keycode'/>
                <br />
                <button>Send</button>
            </form>

            <h2>Keycode</h2>
            <button>Generate Code</button>
        </>
    )
}