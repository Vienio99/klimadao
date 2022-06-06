import React, { FC } from "react";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";
import Link from "next/link";

import { useWeb3 } from "hooks/useWeb3/web3context";
import * as styles from "./styles";
import { concatAddress } from "@klimadao/lib/utils";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  buttons?: JSX.Element[];
};

export const PledgeLayout: FC<Props> = (props) => {
  const { address, connect, disconnect, isConnected } = useWeb3();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.headerBar}>
          <div className={styles.mainHeader}>
            <div className={styles.logo}>
              <Link href={"/pledge"}>
                <a>
                  <KlimaInfinityLogo />
                </a>
              </Link>
            </div>
            <div className={styles.betaBadge}>Beta</div>
          </div>

          <div className={styles.group}>
            <ThemeToggle className={styles.themeToggle} />

            {props.buttons && props.buttons}

            {isConnected && address ? (
              <ButtonPrimary
                label={concatAddress(address)}
                onClick={disconnect}
              />
            ) : (
              <ButtonPrimary label="Connect" onClick={connect} />
            )}
          </div>
        </div>
      </div>

      <>{props.children}</>
    </div>
  );
};
