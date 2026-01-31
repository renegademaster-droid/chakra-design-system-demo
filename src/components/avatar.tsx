import React from "react";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import type { AvatarProps } from "@chakra-ui/react";

const Avatar: React.FC<AvatarProps> = (props) => <ChakraAvatar {...props} />;

export default Avatar;
