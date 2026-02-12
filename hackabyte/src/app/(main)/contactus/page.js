import { permanentRedirect } from 'next/navigation';

export default function ContactUsRedirectPage() {
  permanentRedirect('/contact');
}
