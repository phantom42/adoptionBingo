import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { FaTiktok, FaFacebook, FaInstagram, FaPlus } from "react-icons/fa";

export default function Header({ showNewBoard, onNewBoard }) {
  return (
    <header className="appHeader">
      {/* Left side */}
      <div className="headerLeft">
        {showNewBoard && (
          <div
            className="topLevelMenuItem"
            onClick={onNewBoard}
            role="button"
            tabIndex={0}
          >
            <FaPlus /> New Board
          </div>
        )}

        <details className="findMe">
          <summary>Follow me</summary>
          <ul>
            <li>
              <a href="https://www.tiktok.com/@phantomadoptee" target="_blank" rel="noreferrer">
                <FaTiktok /> @phantomadoptee
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/phantomadoptee" target="_blank" rel="noreferrer">
                <FaFacebook /> @phantomadoptee
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/phantomadoptee" target="_blank" rel="noreferrer">
                <FaInstagram /> @phantomadoptee
              </a>
            </li>
          </ul>
        </details>
      </div>

      {/* Right side */}
      <div className="headerRight">
        <SignedOut>
          <SignInButton mode="modal">
            <button>Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
