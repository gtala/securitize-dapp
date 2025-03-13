import { Account } from "../components/Account";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import {CreateOffer} from "../components/CreateOffer";
import { NetworkSwitcher } from "../components/NetworkSwitcher";

const Page = () => {
  return (
    <>
      <h1>Marketplace</h1>

      <Connect />

      <Connected>

        <Account />
        <hr />
        <CreateOffer />
        <hr />
        <NetworkSwitcher />
      </Connected>
    </>
  );
};

export default Page;